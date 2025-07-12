import React from "react";
import { EventPaymentOptions } from "../dto";
import { PaymentOption } from "@/features/event-payment/dto";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParticipantAdministrationProfile } from "../providers/participant-administration-profile-provider";
import BottomNavigatorButton from "../components/bottom-navigator-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { EventReferral } from "@/features/event-referral/dto";
import { useMutation } from "@tanstack/react-query";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QRCode from "react-qr-code";
import { formatCurrency } from "@/lib/utils";

const PickPaymentForm = ({ options }: { options: EventPaymentOptions }) => {
  const { toPreviousStep, toNextStep } = useParticipantAdministrationProfile();
  const [selectedPayment, setSelectedPayment] =
    React.useState<PaymentOption | null>(null);
  const [referal, setReferal] = React.useState<string>("");

  const [validatedReferal, setValidatedReferal] =
    React.useState<EventReferral | null>(null);
  const validateReferal = useMutation({
    mutationFn: () =>
      handleRequest<EventReferral>(
        "POST",
        "/user/administration/validate-referal",
        {
          code: referal,
        }
      ).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        setValidatedReferal(res.data);
      }),
  });

  return (
    <div className=" space-y-3">
      <div>
        <Label htmlFor="payment">Pilih Metode Pembayaran</Label>
        <Select
          value={selectedPayment?.id}
          onValueChange={(e) => {
            const payment = options.find((payment) => payment.id === e);
            if (payment) {
              setSelectedPayment(payment);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih Metode Pembayaran" />
          </SelectTrigger>
          <SelectContent>
            {options.map((payment) => (
              <SelectItem key={payment.id} value={payment.id}>
                {payment.provider}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="voucher">Kode Voucher</Label>
        <div className=" flex gap-2">
          <Input value={referal} onChange={(e) => setReferal(e.target.value)} />
          <Button
            disabled={!referal || validateReferal.isPending}
            onClick={() => {
              if (referal) {
                validateReferal.mutate();
              }
            }}
          >
            Cek <Search />
          </Button>
        </div>
        <span className=" text-sm text-muted-foreground">
          Jika kamu mempunyai voucher masukkan di sini ya!
        </span>
      </div>

      {selectedPayment && (
        <Card className=" max-w-md">
          <CardHeader>
            <CardTitle>
              <span
                className={
                  validatedReferal && validatedReferal.discount > 0
                    ? "line-through text-muted-foreground"
                    : ""
                }
              >
                {formatCurrency(selectedPayment.amount)}
              </span>
              {validatedReferal && validatedReferal.discount > 0 && (
                <span>
                  {formatCurrency(
                    selectedPayment.amount - validatedReferal.discount
                  )}
                </span>
              )}
            </CardTitle>
            <CardDescription>
              Lakukan Pembayaran Melalui Saluran Berikut!
            </CardDescription>
          </CardHeader>

          <CardContent className=" space-y-3 text-center">
            <h2 className=" font-bold">{selectedPayment.provider}</h2>
            <CardDescription>a.n. {selectedPayment.name}</CardDescription>
            {selectedPayment.as_qr ? (
              <QRCode value={selectedPayment.account} className=" mx-auto " />
            ) : (
              selectedPayment.account
            )}
          </CardContent>
        </Card>
      )}

      <BottomNavigatorButton
        onLeftClick={toPreviousStep}
        rightDisabled={!selectedPayment}
        onRightClick={toNextStep}
      />
    </div>
  );
};

export default PickPaymentForm;
