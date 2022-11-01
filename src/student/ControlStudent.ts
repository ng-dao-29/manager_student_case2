import * as readlineSync from "readline-sync"
import {managerStudent} from "../../main";
import {managerGroup} from "../../main";
import * as readline from "readline-sync";

export class ControlStudent {
    regexpScore: RegExp = /^(?:10|[0-9](?:[.][0-9])?)$/;
    regexpID: RegExp = /^[+0-9]{1,5}$/;
    constructor() {
    }
    //hiên thị mennu (đã xong)
    showStudentManagement() {
        console.log("")
        console.log("|========================================|");
        console.log("|            Quản lý sinh viên           |");
        console.log("|========================================|")
        console.log("|  1 - Thêm sinh viên.                   |");
        console.log("|  2 - Xóa sinh viên.                    |");
        console.log("|  3 - Sửa thông tin sinh viên.          |");
        console.log("|  4 - Hiển thị danh sách sinh viên.     |");
        console.log("|  5 - Hiển thị xếp hạng sinh viên.      |");
        console.log("|  6 - Tìm kiếm sinh viên.               |");
        console.log("|  7 - Tìm kiếm Group.                   |");
        console.log("|  8 - Tim kiếm sinh viên bằng ID        |")
        console.log("|  0 - Chở về Menu chính.                |");
        console.log("|========================================|");
        console.log("")
    }
    //sử lý chọn chức năng(đã xong)
    studentManagement() {
        let run = true;
        while (run) {
            this.showStudentManagement();
            let action = +readlineSync.question("chon chuc nang: ");
            switch (action) {
                case 1:
                    this.addStudent();
                    break;
                case 2:
                    this.deleterStudent();
                    break;
                case 3:
                    this.editStuden();
                    break;
                case 4:
                    console.table(managerStudent.showList());
                    break;
                case 5:
                    console.table(managerStudent.showRank());
                    break;
                case 6:
                    this.nameSearch();
                    break;
                case 7:
                    this.groupSearch();
                    break;
                case 8:
                    this.SearchMemberById();
                    break;
                case 0:
                    run = false;
                    break;
            }
            readline.question("enter de tiep tuc");
        }
    }
    //thêm sinh viên(đã xong)
    addStudent():void {
        let id = +readlineSync.question("ID sinh vien: ");
        while (!(this.regexpID.test(`${id}`))) {
            console.log(`ID phải là số. Có ít nhất 1 số và tối đa là 5 số.`);
            id = +readlineSync.question("ID sinh vien: ");
        }
        if (managerStudent .checkId(id)) {
            let name = readlineSync.question("Ten sinh vien: ");
            let group;
            let back = true;
            while (back) {
                group = readlineSync.question("Group sinh vien tham gia: ");
                if (managerGroup.checkName(group)) {
                    console.log(` Hiện tại Group "${group}" chưa tồn tại`);
                }
                else {
                    let dhk1 = +readlineSync.question("Diem hoc ky I cua sinh vien: ");
                    while (!(this.regexpScore.test(`${dhk1}`))) {
                        console.log("Điểm học kỳ được sét theo thang điểm 10");
                        dhk1 = +readlineSync.question("Nhap lai diem sinh vien theo dung dinh dang: ");
                    }
                    let dhk2 = +readlineSync.question("Diem hoc ky II cua sinh vien: ");
                    while (!(this.regexpScore.test(`${dhk2}`))) {
                        console.log("Điểm học kỳ được sét theo thang điểm 10");
                        dhk2 = +readlineSync.question("Nhap lai diem sinh vien theo dung dinh dang: ");
                    }
                    managerStudent.add(id, name, group, dhk1, dhk2);
                    managerGroup.updateListGroup();
                    back = false;
                }
            }
        }
        else {
            console.log(`Đã có sinh viên sử hữu ID: ${id} hạy nhập ID khác`);
            this.addStudent();
        }
    }
    //xóa sinh viên(đã xong)
    deleterStudent(): void {
        let deleteId = +readlineSync.question("nhap vao ID cua sinh vien muon xoa: ");
        while (!(this.regexpID.test(`${deleteId}`))) {
            console.log(`ID phải là số. Có ít nhất 1 số và tối đa là 5 số.`);
            deleteId = +readlineSync.question("ID sinh vien: ");
        }
        managerStudent.deleteStudent(deleteId);
        managerGroup.updateListGroup();
    }
    //sửa toàn bộ thông tin sinh viên(đã xong)
    StudentFullEdit(): void {
        let idEdit = +readlineSync.question("nhap vao ID cua sinh vien muon chinh sua thong tin: ");
        while (!(this.regexpID.test(`${idEdit}`))) {
            console.log(`ID phải là số. Có ít nhất 1 số và tối đa là 5 số.`);
            idEdit = +readlineSync.question("ID sinh vien: ");
        }
        let index = managerStudent.searchById(idEdit)
        if (index < 0) {
            console.log(`Không tìm thấy sinh viên có ID tương ứng là ${idEdit}`);
        }
        else {
            console.log("thông tin của sinh viên là");
            managerStudent.searchMemberById(idEdit );
            let newName = readlineSync.question("ten moi cua sinh vien la: ");
            let newgroup;
            let run = true;
            while (run) {
                newgroup = readlineSync.question("Group sinh vien da tham gia la: ");
                if (managerGroup.checkName(newgroup)) {
                    console.log(` Hiện tại Group "${newgroup}" chưa tồn tại`);
                } else {
                    let dhk1 = +readlineSync.question("diem hoc ki I cua sinh vien la: ");
                    while (!(this.regexpScore.test(`${dhk1}`))) {
                        console.log("Điểm học kỳ được sét theo thang điểm 10");
                        dhk1 = +readlineSync.question("Nhap lai diem sinh vien theo dung dinh dang: ");
                    }
                    let dhk2 = +readlineSync.question("diem hoc ki II cua sinh vien la");
                    while (!(this.regexpScore.test(`${dhk2}`))) {
                        console.log("Điểm học kỳ được sét theo thang điểm 10");
                        dhk2 = +readlineSync.question("Nhap lai diem sinh vien theo dung dinh dang: ");
                    }
                    managerStudent.editStudent(idEdit, newName, newgroup, dhk1, dhk2);
                    managerGroup.updateListGroup();
                    console.log("Đã trỉnh xửa thông tin sinh viên thành công");
                    run = false
                }
            }
        }
    }
    //tim kiếm sinh viên(đã xong)
    nameSearch(): void {
        let name = readlineSync.question("nhap vao ten sin vien muon tim kiem: ");
        let arrayName = managerStudent.searchName(name)
        if (arrayName.length == 0 ) {
            console.log(`Không tìm thấy sinh viên nào có tên tương ứng: ${name}`);
        }
        else if (arrayName.length > 1) {
            console.log(`Có ${arrayName.length} sinh viên có tên tương ứng: ${name}`);
            console.table(arrayName);
        }
        else {
            console.table(arrayName);
        }
    }
    //tìm kiếm cắc thành viên trong group(đã xong)
    groupSearch(): void {
        let group = readlineSync.question("nhap vao ten group muon tim kiem: ");
        let arrayGroup = managerStudent.searchGroup(group);
        if (arrayGroup.length == 0) {
            console.log(`Không tìm thấy sinh viên nào trong Group "${group}" hoạc Group ko tồn tại hãy kiểm tra lại.`)
        }
        else if(arrayGroup.length > 0) {
            console.log(`Group ${group} đăng có ${arrayGroup.length} sinh viên là: `)
            console.table(arrayGroup);
        }
    }
    //tìm kiếm sinh viên qua ID [8]
    SearchMemberById(): void {
        let id = +readlineSync.question("Nhap vao ID cua sinh vien can tim kiem: ");
        managerStudent.searchMemberById(id);
    }
    // sửa tên sinh vên (đã xong)
    editNameStudent() {
        let id = +readlineSync.question("Nhap vao ID cua sinh vien can thay doi ten: ");
        while (!(this.regexpID.test(`${id}`))) {
            console.log(`ID phải là số. Có ít nhất 1 số và tối đa là 5 số.`);
            id = +readlineSync.question("ID sinh vien: ");
        }
        let index = managerStudent.searchById(id);
        if (index < 0) {
            console.log(` không tìm thấy sinh viên có ID tương ứng là: ${id}`);
        }
        else {
            console.log("thông tin của sinh viên là");
            managerStudent.searchMemberById(id);
            let newName = readlineSync.question("Ten moi cua sinh vien la: ");
            managerStudent.editNameStudent(id,newName);
            console.log(`đã thay đổi tên sinh viên thành ${newName}`);
        }
    }
    // sửa Group sinh viên (đã xong)
    editGroupStudent() {
        let id = +readlineSync.question("Nhap vao ID cua sinh vien can thay doi Group: ");
        while (!(this.regexpID.test(`${id}`))) {
            console.log(`ID phải là số. Có ít nhất 1 số và tối đa là 5 số.`);
            id = +readlineSync.question("ID sinh vien: ");
        }
        let index = managerStudent.searchById(id);
        if (index < 0) {
            console.log(` không tìm thấy sinh viên có ID tương ứng là: ${id}`);
        }
        else {
            console.log("thông tin của sinh viên là");
            managerStudent.searchMemberById(id);
            let newGroup = readlineSync.question("Thay doi Group cua sinh vien thanh: ");
            if (managerGroup.checkName(newGroup)) {
                console.log(` Hiện tại Group "${newGroup}" chưa tồn tại`);
            } else {
                managerStudent.editGroupStudent(id, newGroup)
                console.log(`đã thay đổi Group của sinh viên thành ${newGroup}`);
            }
        }
    }
    // sửa điểm học kỳ I sin viên (đã xong)
    editSs1Student() {
        let id = +readlineSync.question("Nhap vao ID cua sinh vien can sua diem hoc ky I : ");
        while (!(this.regexpID.test(`${id}`))) {
            console.log(`ID phải là số. Có ít nhất 1 số và tối đa là 5 số.`);
            id = +readlineSync.question("ID sinh vien: ");
        }
        let index = managerStudent.searchById(id);
        if (index < 0) {
            console.log(` không tìm thấy sinh viên có ID tương ứng là: ${id}`);
        }
        else {
            console.log("thông tin của sinh viên là");
            managerStudent.searchMemberById(id);
            let newSs1 = +readlineSync.question("Diem hoc ky I cua sinh vien se thay doi thành : ");
            while (!(this.regexpScore.test(`${newSs1}`))) {
                console.log("Điểm học kỳ được sét theo thang điểm 10");
                newSs1 = +readlineSync.question("Nhap lai diem sinh vien theo dung dinh dang: ");
            }
            managerStudent.editSs1Student(id,newSs1)
            console.log(`đã sửa điểm hocj kỳ I của sinh viên thành ${newSs1}`);
        }
    }
    // sửa điểm học kỳ II sinh viên (đã xong)
    editSs2Student() {
        let id = +readlineSync.question("Nhap vao ID cua sinh vien can sua diem hoc ky II: ");
        while (!(this.regexpID.test(`${id}`))) {
            console.log(`ID phải là số. Có ít nhất 1 số và tối đa là 5 số.`);
            id = +readlineSync.question("ID sinh vien: ");
        }
        let index = managerStudent.searchById(id);
        if (index < 0) {
            console.log(` không tìm thấy sinh viên có ID tương ứng là: ${id}`);
        }
        else {
            console.log("thông tin của sinh viên là");
            managerStudent.searchMemberById(id);
            let newSs2 = +readlineSync.question("Diem hoc ky cua sinh vien thay doi thanh: ");
            while (!(this.regexpScore.test(`${newSs2}`))) {
                console.log("Điểm học kỳ được sét theo thang điểm 10");
                newSs2 = +readlineSync.question("Nhap lai diem sinh vien theo dung dinh dang: ");
            }
            managerStudent.editSs2Student(id,newSs2);
            console.log(`đã thay đổi diểm học kỳ II của sinh viên thành ${newSs2}`);
        }
    }
    // menu edit(đã xong)
    menuedit() {
        console.log("");
        console.log("|=======================================|");
        console.log("|      Chọn thông tin muốn thay đổi     |");
        console.log("|=======================================|");
        console.log("|  1 - Sửa toàn bộ thông tin.           |");
        console.log("|  2 - Sửa tên của sinh viên.           |");
        console.log("|  3 - Sửa Group của sinh viên.         |");
        console.log("|  4 - Sửa điểm học kỳ I của sinh viên. |");
        console.log("|  5 - Sửa điểm học kỳ II của sinh viên.|");
        console.log("|  0 - thoát.                           |");
        console.log("|=======================================|");
        console.log("");
    }
    // thực hiên lựa chọn xóa(đã xong)
    editStuden() {
        let run = true;
        while (run) {
            this.menuedit();
            let action = +readlineSync.question("Thong tin muon thay doi la: ");
            switch (action) {
                case 1:
                    this.StudentFullEdit();
                    break;
                case 2:
                    this.editNameStudent();
                    break;
                case 3:
                    this.editGroupStudent();
                    break;
                case 4:
                    this.editSs1Student();
                    break;
                case 5:
                    this.editSs2Student();
                    break;
                case 0:
                    run = false;
                    break;
            }
            readlineSync.question("Ban se duoc dua ve menu");
        }
    }

}