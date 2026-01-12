export type Option = {
  id?: string;
  name: string;
  value: string;
};

export type OptionData = Option[];

export type OptionWithId = Omit<Option, 'id'> & { id: string };

export type OptionDataWithId = OptionWithId[];
