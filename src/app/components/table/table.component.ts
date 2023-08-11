import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Actions } from 'src/app/actions/actions-enum';
import { TOKEN_KEY } from 'src/app/constants/token.consts';
import { User } from 'src/app/interfaces/user.interface';
import { UsersApiService } from 'src/app/services/api-services/users-api.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { FilterService } from 'src/app/services/filter.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'is_admin',
    'update_at',
    'create_at',
    'status',
    'is_ecp',
  ];
  dataSource: MatTableDataSource<User>;
  users: User[];
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private usersApiService: UsersApiService,
    private communicationService: CommunicationService,
    private filterService: FilterService
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  get isAllSelected() {
    return this.users?.every((elem) => elem.isSelected === true);
  }

  toggleAll() {
    return this.isAllSelected
      ? (this.users = this.users.map((elem) => ({
          ...elem,
          isSelected: false,
        })))
      : (this.users = this.users.map((elem) => ({
          ...elem,
          isSelected: true,
        })));
  }

  toggleItem(id: number) {
    this.users = this.users.map((elem) =>
      elem.id === id ? { ...elem, isSelected: !elem.isSelected } : elem
    );
  }

  ngOnInit() {
    this.communicationService
      .getData()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((actionMessage) => {
        if (actionMessage === Actions.Block) {
          this.users = this.users.map((elem) =>
            elem.isSelected
              ? { ...elem, status: 'blocked', isSelected: false }
              : elem
          );
          localStorage.setItem(TOKEN_KEY, JSON.stringify(this.users));
        }

        if (actionMessage === Actions.Unblock) {
          this.users = this.users.map((elem) =>
            elem.isSelected
              ? { ...elem, status: 'ACTIVE', isSelected: false }
              : elem
          );
          localStorage.setItem(TOKEN_KEY, JSON.stringify(this.users));
        }
        if (actionMessage.message === Actions.Filter) {
          this.users = this.filterService.filter(
            this.users,
            actionMessage.payload
          );
        }
        if (actionMessage === Actions.Cancel) {
          this.users = JSON.parse(localStorage.getItem(TOKEN_KEY));
        }
      });

    if (localStorage.getItem(TOKEN_KEY)) {
      this.users = JSON.parse(localStorage.getItem(TOKEN_KEY));
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      return;
    }
    this.usersApiService.getUsers().subscribe((users) => {
      this.users = users;
      localStorage.setItem(TOKEN_KEY, JSON.stringify(this.users));
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnDestroy() {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}
