import { ChangeEvent, FormEvent } from "react";

export interface IExpertiseFilterProps {
  selectedStatus?: string; 
  selectedStartDate?: string; 
  selectedEndDate?: string; 
  handleStatusChange: (e: ChangeEvent<HTMLSelectElement>) => void; 
  handleStartDateChange: (e: ChangeEvent<HTMLInputElement>) => void; 
  handleEndDateChange: (e: ChangeEvent<HTMLInputElement>) => void; 
  handleFilterClick: (e: FormEvent) => void; 
}