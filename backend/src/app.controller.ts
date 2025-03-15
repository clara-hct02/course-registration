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

    //RETURN: list of ids and names for the user's worklists
    @Get(':userid/getSavedScheduleIDs')
    getSavedScheduleIDs(@Param() params: any): Object[] {
        //under the assumption that MongoDB unique ids are numbers

        var exampleObject = {
            id: 0,
            name: "",
        }

        //go through the WORKLISTS table and find all worklist entries associated
        //with a userid from the request
        return [];
    }

    //RETURN: list of sectionids associated with the worklist
    @Get(':worklistid')
    getSectionsForWorklist(@Param() params: any): number[] {
        return [];
    }

    //REQUEST: user's login information?
    //RETURN: userid on success
    @Post('login')
    login(@Req() request: Request): number {
        return 0;
    }

    //REQUEST: sectionid, userid
    //RETURN: true if success
    @Post('register')
    register(@Req() request: Request): boolean {
        return false;
    }

    //REQUEST: sectionid, userid
    //RETURN: true if success
    @Post('dropCourse')
    dropCourse(@Req() request: Request): boolean {
        return false;
    }

    //REQUEST: sectionid, worklistid
    //RETURN: true if success
    @Post('addToWorklist')
    addToWorklist(@Req() request: Request): boolean {
        //evaluate: time conflicts with other courses in worklist
        //          is this a duplicate course?
        //          if we're doing records, has the user taken this course and passed before?
        return false;
    }

    //REQUEST: sectionid, worklistid
    //REUTNR: true if success
    @Post('removeFromWorklist')
    removeFromWorklist(@Req() request: Request): boolean {
        return false;
    }

    //create a new worklist with a given name. if the name is already in use by this user,
    //REQUEST: worklist name, userid
    //RETURN: worklist id if success
    @Post('createWorklist')
    createNewWorklist(@Req() request: Request): number {
        return 0;
    }

    //OPTIONAL (admin)
    //REQUEST: userid, course info
    //RETURN: the new course's id
    @Post('createCourse')
    createNewCourse(@Req() request: Request): number {
        return 0;
    }

    //OPTIONAL (admin)
    //REQUEST: contains a userid (or something to identify user as admin) and section info
    //RETURN: id of created section (if success)
    @Post(':courseid/addSection')
    addSection(@Req() request: Request, @Param() params: any): number {
        return 0;
    }

    //OPTIONAL (admin)
    //REQUEST: contains userid, section info
    //RETURN: true if success
    @Post(':courseid/:sectionid/edit')
    editSection(@Req() request: Request, @Param() params: any): boolean {
        return false;
    }

    //OPTIONAL
    //REQUEST: username and password?
    //RETURN: userid if successful
    @Post('registerUser')
    registerNewUser(@Req() request: Request): number {
        return 0;
    }
}
