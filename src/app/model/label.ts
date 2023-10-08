export interface Label {
  id: number;
  labelName: string;
  backgroundColor: string;
  fontColor: 'white' | 'black';
  description?: string;
  createdAt?: Date;
}
