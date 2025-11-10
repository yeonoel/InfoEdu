import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./Dto/createReviewDto";
import { AuthGuard } from "@nestjs/passport";

@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post("new-review")
  create(@Request() request, @Body() createReviewDto: CreateReviewDto) {
    const userId = request.user!["id"];
    createReviewDto.userId = userId;
    return this.reviewService.create(createReviewDto);
  }
}
