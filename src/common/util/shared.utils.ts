import {Injectable} from "@nestjs/common";

@Injectable()
export class sharedUtils {

	static async pageUtil(page, pageSize) {
		return {
			skip: (page - 1) * pageSize,
			take: pageSize,
		};
	}
}