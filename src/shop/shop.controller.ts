import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query, Render,
  Res
} from "@nestjs/common";
import { ShopService } from './shop.service';
import {SearchShopDto} from './search.shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}


  @Get('/insert')
  @Render('shop/insert')
  getInsert(){
    return {};
  }

  @Get('/list')
  @Render('web/shop/list')
  async getList(@Query() query: SearchShopDto){
    const shopList = await this.shopService.getShop(query);
    console.log("shoplist contorller > ", shopList);
    return {
      query:query,
      shopList: shopList
    };
  }

  /*@Post()
  createUser(@Body() bodyData) {
    return this.shopService.createUser(bodyData);
  }

  @Get()
  getUser(@Query('phoneNumber') phoneNumber: string) {
    return this.shopService.getUser(phoneNumber);
  }

  @Put()
  updateUser(@Body() bodyData, @Res() res: Response) {
    return this.shopService.updateUser(bodyData, res);
  }

  @Delete()
  deleteUser(@Query('phoneNumber') phoneNumber: string, @Res() res: Response) {
    return this.shopService.deleteUser(phoneNumber, res);
  }*/
}
