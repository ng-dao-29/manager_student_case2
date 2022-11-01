export class Student {
    id: number;
    name: string;
    group: string;
    scoresSemester1: number;
    scoresSemester2: number;
    mediumScore: number;
    constructor(id: number,
                name: string,
                group: string,
                semester1: number,
                semester2: number) {
        this.id = id
        this.name = name;
        this.group = group;
        this.scoresSemester1 = semester1;
        this.scoresSemester2 = semester2;
        this.mediumScore = (this.scoresSemester1 + this.scoresSemester2) / 2
    }
    // sửa tên(đã xong)
    editName(name: string): void {
        this.name = name;
    }
    //sửa Group(đã xong)
    editGroup(group: string): void {
        this.group = group;
    }
    //sửa điểm 1 (đã xong)
    editSS1(dhk1: number): void {
        this.scoresSemester1 = dhk1;
        this.editMedium();
    }
    // sửa điểm 2 (đã xong)
    editSS2(dhk2: number): void {
        this.scoresSemester2 = dhk2;
        this.editMedium()
    }
    // sửa điểm tb(đã xong)
    editMedium() {
        this.mediumScore = (this.scoresSemester1 + this.scoresSemester2) / 2;
    }
}