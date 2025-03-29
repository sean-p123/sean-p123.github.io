export interface Equipment {
    id:number;
    name:string;
    category: EquipmentCategory;
    description: string;
}
export type EquipmentCategory = 'audio' | 'lighting' | 'staging' | 'video' | 'power';
