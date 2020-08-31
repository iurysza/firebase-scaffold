import { ReviewsController } from "../../application/controllers/ReviewsController";
import { ReviewsDatasource } from "../../application/datasources/ReviewsDatasource";
import { instance, when, mock, reset } from "ts-mockito";
import { mockResponse, mockRequest } from "../../tests/testUtils";

describe("Given there are no results available", () => {
  const mockedDatasource = mock(ReviewsDatasource);
  let SUT: ReviewsController;

  beforeEach(() => {
    SUT = new ReviewsController(instance(mockedDatasource));
  });

  afterEach(() => {
    reset(mockedDatasource);
  });

  describe("When getAllReviews is called ", () => {
    const mockedQueryResult = {
      isError: false,
      data: [],
      message: "Test is nice",
      code: 200,
    };

    when(mockedDatasource.getAllReviews()).thenResolve(mockedQueryResult);

    it("Should return status code 200 to the caller", async () => {
      const mockedResponse = mockResponse();
      await SUT.getReviews(mockRequest(), mockedResponse);
      expect(mockedResponse.status).toHaveBeenCalledWith(mockedQueryResult.code);
    });
  });
});
