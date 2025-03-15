import {Controller, Get, Param, Post, Req} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get(':userid/getSavedScheduleIDs')
    GetSavedScheduleIDs(@Param() params: any): Object[] {
        //under the assumption that MongoDB unique ids are numbers

        var exampleObject = {
            id: 0,
            name: "",
        }

        //go through the WORKLISTS table and find all worklist entries associated
        //with a userid from the request
        return [];
    }

    @Get(':worklistid')
    GetCoursesForWorklist(@Param() params: any): number[] {
        return [];
    }

    @Post('login')
    Login(@Req() request: Request): number {
        //return the userid if the login is successful????
        return 0;
    }

    @Post('register')
    Register(@Req() request: Request): boolean {
        //get userid + courseid from the request, return true if registration success
        return false;
    }

    @Post('addToWorklist')
    AddToWorklist(@Req() request: Request): boolean {
        //get userid + courseid + worklistid from the request, return true if success

        //evaluate: time conflicts with other courses in worklist
        //          is this a duplicate course?
        //          if we're doing records, has the user taken this course and passed before?
        return false;
    }
}
