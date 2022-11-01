import {Student} from "./Student";
import {managerGroup} from "../../main";

export class ManagerStudent {
    list: Student [] = [];
    size: number;
    constructor() {
        this.size = 0;
    }

    // (đã xong)
    checkId(id: number) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id == id) {
                return false;
            }
        }
        return true;
    }

    //thêm sinh viên (đã xong)
    add(id: number,
        name: string,
        group: string,
        dhk1: number,
        dhk2: number): void {
        this.list.push(new Student(id, name, group, dhk1, dhk2));
        console.log(`Đã thêm vào sinh viên mới có tên là: ${name}`);
        this.size++;
    }

    // hiện thị sinh viên (đã xong)
    showList(): Student[] {
        return this.list;
    }

    // danh sách top (đã xong)
    showRank(): Student [] {
        let run = true;
        for (let i = 1; i < this.list.length && run; i++) {
            run = false;
            for (let j = 0; j < this.list.length - i; j++) {
                if (this.list[j].mediumScore < this.list[j + 1].mediumScore) {
                    let temp: Student = this.list[j];
                    this.list[j] = this.list[j + 1];
                    this.list[j + 1] = temp;
                    run = true;
                }
            }
        }
        return this.list;
    }

    //tìm kiếm theo tên (đã xong)
    searchName(name: string): Student[] {
        let names: Student[] = []
        for (let i = 0; i < this.list.length; i++) {
            if (name === this.list[i].name) {
                names.push(this.list[i]);
            }
        }
        return names
    }

    //tìm kiếm theo group (đã xong)
    searchGroup(group: string): Student[] {
        let groups: Student[] = [];
        for (let j = 0; j < this.list.length; j++) {
            if (group == this.list[j].group) {
                groups.push(this.list[j]);
            }
        }
        return groups;
    }

    //xóa sinh viên (đã xong)
    deleteStudent(id: number): void {
        let index = this.searchById(id)
        if (index == -1) {
            console.log(`không tìm thấy sinh viên có ID tương ứng là: ${id}`)
        } else {
            this.list.splice(index, 1);
            console.log(`Đã xóa bỏ sinh viên có ID: ${id}`);
            this.size--
        }
    }

    //tim index qua Id(đã xong)
    searchById(id: number): number {
        let index = -1;
        for (let m = 0; m < this.list.length; m++) {
            if (this.list[m].id == id) {
                index = m;
                return index;
            }
        }
        return index;
    }

    searchMemberById(id:number): Student {
        let index = this.searchById(id);
        if (index < 0) {
            console.log(`không tìm thấy sinh viên có ID tương ứng là: ${id}`)
        }
        else {
            console.table(this.list[index])
            return this.list[index]
        }
    }

    // sửa thông tin sinh viên (đã xong)
    editStudent(id: number,
                name: string,
                group: string,
                dk1: number,
                dk2: number): void {
        let index = this.searchById(id);
        if (index == -1) {
            console.log(`không tìm thấy sinh viên có ID tương ứng là: ${id}`)
        } else {
            this.list[index].editName(name);
            this.list[index].editGroup(group);
            this.list[index].editSS1(dk1);
            this.list[index].editSS2(dk2);
        }
    }
    //sưa tên(đã xong)
    editNameStudent(id: number,newName: string) {
        let index = this.searchById(id);
        if (index < 0) {
            console.log(` không tìm thấy sinh viên có ID tương ứng là: ${id}`);
        }
        else {
            this.list[index].editName(newName);
        }
    }
    // sưa group(đã xong)
    editGroupStudent(id: number,Group: string) {
        let index = this.searchById(id);
        if (index < 0) {
            console.log(` không tìm thấy sinh viên có ID tương ứng là: ${id}`);
        }
        else {
            this.list[index].editGroup(Group);
            managerGroup.updateListGroup();
        }
    }
    //sửa diểm hk1(đã xong)
    editSs1Student(id: number, ss1: number) {
        let index = this.searchById(id);
        if (index < 0) {
            console.log(` không tìm thấy sinh viên có ID tương ứng là: ${id}`);
        }
        else {
            this.list[index].editSS1(ss1);
        }
    }
    //sửa điểm hk2 (đã xong)
    editSs2Student(id: number, ss2: number) {
        let index = this.searchById(id);
        if (index < 0) {
            console.log(` không tìm thấy sinh viên có ID tương ứng là: ${id}`);
        }
        else {
            this.list[index].editSS2(ss2);
        }
    }
}