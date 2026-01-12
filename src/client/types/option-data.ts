export type Option = {
  name: string | null | undefined;
  value: string | null | undefined;
};

export type OptionData = Option[];

export type OptionWithId = {
  id: string;
  name: string;
  value: string;
};

export type OptionDataWithId = OptionWithId[];

export type ServerError = {
  data: {
    message: string;
  };
};
