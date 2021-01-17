import { commonSearchDto } from '../../common/dto/common.search.dto';

export class SearchUserDto extends commonSearchDto {
  keyword: string;
}
