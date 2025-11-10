import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewDto } from "./Dto/createReviewDto";
import { PrismaService } from "src/prisma/prisma.service";
import { connect } from "http2";

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    const { comment, schoolId, userId, scores } = createReviewDto;
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException("User not found");
    const school = await this.prismaService.school.findUnique({
      where: { id: schoolId },
    });
    if (!school) throw new NotFoundException("School not found");
    const review = await this.prismaService.review.create({
      data: {
        comment,
        schoolId,
        userId,
        scores: {
          create:
            scores?.map((score) => ({
              criteriaId: score.criteriaId,
              value: score.value,
            })) || [],
        },
      },
      include: { scores: true },
    });
    return review;
  }
}
