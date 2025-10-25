

export interface DeleteProviderUseCase {
    execute(id: string): Promise<boolean>
} 