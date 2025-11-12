import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewDto } from "./Dto/createReviewDto";
import { PrismaService } from "src/prisma/prisma.service";
import { connect } from "http2";

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    const { comment, schoolId, userId, scores } = createReviewDto;
    const user = await this.prismaService.users.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException("User not found");
    const school = await this.prismaService.schools.findUnique({
      where: { id: schoolId },
    });
    if (!school) throw new NotFoundException("School not found");
    const review = await this.prismaService.reviews.create({
      data: {
        comment,
        schoolId,
        userId,
        reviewScores: {
          create:
            scores?.map((score) => ({
              criteriaId: score.criteriaId,
              value: score.value,
            })) || [],
        },
      },
      include: { reviewScores: true },
    });
    return review;
  }
}
