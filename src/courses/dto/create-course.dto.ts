import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  MaxLength,
  IsDecimal,
} from 'class-validator';

enum Category {
  WEB_DEVELOPMENT = 'Web Development',
  MOBILE_DEVELOPMENT = 'Mobile Development',
  DATA_SCIENCE = 'Data Science',
  BUSINESS = 'Business',
  DESIGN = 'Design',
  MARKETING = 'Marketing',
  IT_AND_SOFTWARE = 'IT and Software',
  PERSONAL_DEVELOPMENT = 'Personal Development',
  PHOTOGRAPHY = 'Photography',
  MUSIC = 'Music',
  LITERATURE = 'Literature',
  CAREER_DEVELOPMENT = 'Career Development',
  OFFICE_PRODUCTIVITY = 'Office Productivity',
  PERSONAL_BRANDING = 'Personal Branding',
  SELF_IMPROVEMENT = 'Self-Improvement',
  SOCIAL_SCIENCE = 'Social Science',
  SELF_HELP = 'Self-Help',
  PRODUCTIVITY = 'Productivity',
  PHYSICAL_SCIENCE_AND_ENGINEERING = 'Physical Science & Engineering',
  HEALTH_AND_FITNESS = 'Health & Fitness',
}

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly description: string;

  @IsNotEmpty()
  @IsDecimal()
  readonly rating: number;

  @IsNotEmpty()
  @IsDecimal()
  readonly discount: number;
}
