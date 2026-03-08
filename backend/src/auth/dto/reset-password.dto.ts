import { IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @MaxLength(256)
  token: string;

  @ApiProperty({
    example: "password123",
    description: "Must be at least 6 characters long",
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  newPassword: string;
}
