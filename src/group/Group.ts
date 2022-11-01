import {Student} from "../student/Student";
import {managerStudent} from "../../main";

export class Group {
    nameGroup:string;
    numberMembers:number;
    listStudent: Student [];
    constructor(name:string) {
        this.nameGroup = name;
        this.listStudent = managerStudent.searchGroup(name);
        this.numberMembers = this.listStudent.length;
    }
    //sửa tên (đã xong)
    editName(nameNew:string):void {
            this.nameGroup = nameNew;
    }
    //thêm thành viên (dã xong)
    addStudent(id:number): void {
        let index = managerStudent.searchById(id);
        if (index == -1) {
            console.log(`Không tồn tại sinh viên có ID là: ${id}`)
        }
        else {
            if (managerStudent.list[index].group == undefined) {
                managerStudent.list[index].editGroup(this.nameGroup);
                console.log(`đã thêm sinh viên có ID ${id} vào group thành công`);
                }
            else if (managerStudent.list[index].group == this.nameGroup) {
                console.log("sinh viên đã có mặt trong Group này rồi")
            }
            else {
                console.log(`sinh viên nãy đăng trong Group: ${managerStudent.list[index].group}`);
                console.log("muốn tham gia Group này thì sinh viên phải rời Group đã tham gia trước đó");
                console.log("có thể liên hệ bên quản lý sinh viên để thay đổi Group")
            }
        }
    }

    // xóa thành viên (đã xong)
    // đăng bị chùng lặp code với controlgroup.deleterStudent
    deleteStudent(id): void {
        let index = managerStudent.searchById(id);
        if (index == -1) {
            console.log(`Không tìm thấy sinh viên có ID tương ứng là: ${id}`);
        }
        else {
            managerStudent.list[index].editGroup(undefined);
            console.log(` Đã xóa sinh viên có ID là ${id} khỏi Group thành công`)
        }
    }
    //hiển thị danh sách(đã xong)
    setlist(): void {
        this.listStudent = managerStudent.searchGroup(this.nameGroup)
        this.numberMembers = this.listStudent.length;
    }
}