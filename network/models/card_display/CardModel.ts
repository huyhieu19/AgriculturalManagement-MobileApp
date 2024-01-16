export interface CardInforProps {
  property: string;
  value: ValueCardProps;
}
export interface ValueCardProps {
  value: string | number | null | undefined;
  color?: string | undefined | null;
}