export const mockRequest: any = () => {};

export const mockResponse: any = () => {
  const res: { [k: string]: any } = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
