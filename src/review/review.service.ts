import { Injectable } from '@nestjs/common';
import { CreateCriteriaDto } from 'src/criteria/Dto/CreateCriteriaDto';
import { CreateReviewDto } from './Dto/createReviewDto';

@Injectable()
export class ReviewService {
    create(createReviewDto: CreateReviewDto) {
        return 'This action adds a new review';
    }
}
