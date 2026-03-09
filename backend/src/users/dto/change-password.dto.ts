import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty({ description: "Current password" })
  @IsString()
  @MaxLength(128)
  currentPassword: string;

  @ApiProperty({
    description: "New password (min 6 characters)",
    example: "pass123"
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  newPassword: string;
}
