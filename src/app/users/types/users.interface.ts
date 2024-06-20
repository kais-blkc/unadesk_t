export type TItemsPerPage = 5 | 10 | 20;

export interface UserDto {
  id: string;
  user_name: string;
  is_active: boolean;
}

export interface ListRequest {
  pageNumber: number;
  search?: string;
  itemsPerPage: TItemsPerPage;
}

export interface UserListResponseDto {
  total_count: number;
  items: UserDto[];
}

export type TViewMode = 'grid' | 'list';
