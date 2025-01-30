export interface IPaintingsTableRow {
    pk: number;
    title: string;
    shortDescription: string;
    description: string;
    imgPath: string;
  }
  
  export interface IPaintingsTableProps {
    rows: IPaintingsTableRow[];
  }