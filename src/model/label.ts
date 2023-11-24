export interface Label {
  id: string;
  labelName: string;
  backgroundColor: string;
  fontColor: 'white' | 'black';
  description?: string;
  createdAt?: Date;
}
