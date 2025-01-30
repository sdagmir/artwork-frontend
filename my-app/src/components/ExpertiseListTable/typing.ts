export interface IExpertiseTableRow {
    number: number; 
    author: string; 
    status: string; 
    creationDate: string; 
    completionDate?: string; 
    result: boolean; 
    qr?: string;
  }
  
  export interface IExpertiseTableProps {
    rows: IExpertiseTableRow[]; // Список строк таблицы.
  }