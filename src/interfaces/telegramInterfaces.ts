export interface WebApp {
    initData: string;
    initDataUnsafe: WebAppInitData
    version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  //themeParams: ThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  //BackButton: BackButton;
  //MainButton: MainButton;
  //SettingsButton: SettingsButton;
  //HapticFeedback: HapticFeedback;
  CloudStorage: CloudStorage;
  //BiometricManager?: BiometricManager; // BiometricManager is new, handle appropriately
  isVersionAtLeast: (version: string) => boolean;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  onEvent: (eventType: string, eventHandler: () => void) => void;
  offEvent: (eventType: string, eventHandler: () => void) => void;
  sendData: (data: any) => void;
  switchInlineQuery: (query: string, choose_chat_types?: string[]) => void;
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
  openTelegramLink: (url: string) => void;
  openInvoice: (url: string, callback?: (status: any) => void) => void;
  //showPopup: (params: PopupParams, callback?: (buttonId: string) => void) => void;
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
  //showScanQrPopup: (params: ScanQrPopupParams, callback?: (qrText: string) => boolean) => void;
  closeScanQrPopup: () => void;
  readTextFromClipboard: (callback?: (text: string) => void) => void;
  requestWriteAccess: (callback?: (granted: boolean) => void) => void;
  requestContact: (callback?: (shared: boolean) => void) => void;
  ready: () => void;
  expand: () => void;
  close: () => void;
}

export interface CloudStorage {
    setItem(key: string, value: string, callback?: (error: any, success: boolean) => void): void;
    getItem(key: string, callback: (error: any, value?: string) => void): void;
    getItems(keys: string[], callback: (error: any, values?: { [key: string]: string }) => void): void;
    removeItem(key: string, callback?: (error: any, success: boolean) => void): void;
    removeItems(keys: string[], callback?: (error: any, success: boolean) => void): void;
    getKeys(callback: (error: any, keys?: string[]) => void): void;
}

export interface WebAppInitData {
    query_id?: string;
    user?: WebAppUser;
    receiver?: WebAppUser;
    chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
    chat_instance?: string;
    start_param?: string;
    can_send_after?: number;
    auth_date?: number;
    hash?: string;
}

export interface WebAppUser {
    id: number;
    is_bot?: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    added_to_attachment_menu?: boolean;
    allows_write_to_pm?: boolean;
    photo_url?: string;
  }