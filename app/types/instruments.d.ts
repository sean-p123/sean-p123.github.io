export interface Instruments {
    id: number; 
    name: string;
    category: InstrumentType;
    description: string;
    icon: string;
}
export type InstrumentType = 'string' | 'percussion' | 'wind' | 'keyboard' | 'electronic';
