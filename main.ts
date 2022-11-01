//inport cắc Class
import {ManagerStudent} from "./src/student/ManagerStudent";
import {ManagerGroup} from "./src/group/ManagerGroup";
import {ControlStudent} from "./src/student/ControlStudent";
import {ControlGroup} from "./src/group/ControlGroup";
import {ControlMain} from "./src/ControlMain";
import {ControlAdminGroup} from "./src/group/ControlAdminGroup";

export let managerStudent = new ManagerStudent();
export let managerGroup = new ManagerGroup();
export let controlGroup = new ControlGroup();
let controlStudent = new ControlStudent;
let controlAdminGroup = new ControlAdminGroup();
let controlMain = new ControlMain(controlStudent,controlGroup,controlAdminGroup);

managerStudent.add(1,"student 1","C10", 8,9);
managerStudent.add(3,"student 2","C08", 10,10);
managerStudent.add(5,"student 3","C08",7,9);
managerStudent.add(9,"student 4","C09",5,4);

managerGroup.addGroup("C08");
managerGroup.addGroup("C09");
managerGroup.addGroup("C10");

controlMain.mainMenu();