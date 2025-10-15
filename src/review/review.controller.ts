import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './Dto/createReviewDto';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post('new-review')
    create(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewService.create(createReviewDto);
    }
}
