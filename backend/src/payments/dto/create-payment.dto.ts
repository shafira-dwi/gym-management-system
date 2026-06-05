export class CreatePaymentDto {
  memberId: number;
  amount: number;
  type: 'NEW' | 'EXTEND';
  method: 'CASH' | 'TRANSFER' | 'EWALLET';
}
