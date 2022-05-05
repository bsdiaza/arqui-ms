export class CreateVideoDto {
  readonly owner: number;
  readonly community: number;
  readonly name: string;
  readonly description: string;
  extension: string;
}