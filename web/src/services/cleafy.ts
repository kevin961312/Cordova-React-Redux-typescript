// Types mirrored from pkg/PluginCleafy/www/CleafyCordovaPlugin.d.ts
export type Callback<T> = (data: T) => any;

export type ProbeTrace = {
  timestamp: number;
  sessionId: string;
  eventId: string;
  probeType: "CUSTOM" | "STANDARD";
  statusCode: number;
};

export type AgentDiagnostics = {
  deviceId: string;
  probeTraces: ProbeTrace[];
  errors: string[];
  successfulProbeSubmissions: number;
  failedProbeSubmissions: number;
  lastConfigurationUpdateTimestamp: number;
};

export type CleafyDetectorsConfiguration = {
  isHttpDetectorEnabled: boolean;
  isCertDetectorEnabled: boolean;
  certDetectorEndpoint: string;
  isMonitoredAppEnabled: boolean;
  isActivityDetectorEnabled: boolean;
  isAdvancedHttpCertDetectorEnabled: boolean;
  isRootDetectorEnabled: boolean;
  isTaskInjectionEnabled: boolean;
  isMockLocationDetectorEnabled: boolean;
  isAdvancedMockLocationDetectorEnabled: boolean;
  isOnCallDetectorEnabled: boolean;
  isHumanDetectorEnabled: boolean;
};

export type CleafyConfiguration = {
  apiEndpoint: string;
  applicationHostname: string;
  integrationToken: string;
  isDefaultEnabled: boolean;
  automaticUpdateAnalysis: "NONE" | "FOREGROUND";
  emulatorDebugAnalysis: "NONE" | "BASIC" | "ADVANCED";
  isPackageAnalysisEnabled: boolean;
  isExtendedPackageInformation: boolean;
  isSensitiveIdentifierCollectionEnabled: boolean;
  isHashSensitiveIdentifiers: boolean;
  isAllowUntrustedCertificates: boolean;
  detectorsConfiguration: CleafyDetectorsConfiguration;
};

export interface CleafyPlugin {
  initWithConfiguration(onSuccess: Callback<void>, onError: Callback<string>, configuration: CleafyConfiguration): void;
  invalidateSession(onSuccess: Callback<void>, onError: Callback<string>): void;
  updateDetection(onSuccess: Callback<void>, onError: Callback<string>): void;
  getDiagnostics(onSuccess: Callback<AgentDiagnostics>, onError: Callback<string>): void;
  registerDiagnosticsListener(onSuccess: Callback<AgentDiagnostics>, onError: Callback<string>): void;
  getSessionId(onSuccess: Callback<string>, onError: Callback<string>): void;
  getBrowserId(onSuccess: Callback<string>, onError: Callback<string>): void;
  getParentId(onSuccess: Callback<string>, onError: Callback<string>): void;
  getApplicationHostname(onSuccess: Callback<string>, onError: Callback<string>): void;
  getVersion(onSuccess: Callback<string>, onError: Callback<string>): void;
  getDeviceId(onSuccess: Callback<string>, onError: Callback<string>): void;
  setLocation(onSuccess: Callback<string>, onError: Callback<string>, location: string): void;
  setAppSessionId(onSuccess: Callback<string>, onError: Callback<string>, appSessionId: string): void;
  setUserId(onSuccess: Callback<string>, onError: Callback<string>, userId: string): void;
  setAppDeviceId(onSuccess: Callback<string>, onError: Callback<string>, appDeviceId: string): void;
  registerLocationListener(onSuccess: Callback<void>, onError: Callback<string>, provider?: string, minTime?: number, minDistance?: number): void;
}

declare global {
  interface Window {
    Cleafy?: CleafyPlugin;
  }
}

/**
 * Returns true if running inside a Cordova webview with the Cleafy plugin installed.
 */
export function isCleafyAvailable(): boolean {
  return typeof window.Cleafy !== "undefined";
}

/**
 * Get the raw Cleafy plugin object (or null if not in Cordova).
 */
export function getCleafyPlugin(): CleafyPlugin | null {
  return window.Cleafy ?? null;
}

// --- Promise-based wrappers for each plugin function ---

export function initWithConfiguration(config: CleafyConfiguration): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.initWithConfiguration(() => resolve(), (err) => reject(err), config);
  });
}

export function invalidateSession(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.invalidateSession(() => resolve(), (err) => reject(err));
  });
}

export function updateDetection(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.updateDetection(() => resolve(), (err) => reject(err));
  });
}

export function getDiagnostics(): Promise<AgentDiagnostics> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.getDiagnostics((data) => {
      // The plugin may return probeTraces/errors as JSON strings instead of arrays
      const parsed: AgentDiagnostics = {
        ...data,
        probeTraces: typeof data.probeTraces === 'string' ? JSON.parse(data.probeTraces) : data.probeTraces,
        errors: typeof data.errors === 'string' ? JSON.parse(data.errors) : data.errors,
      };
      resolve(parsed);
    }, (err) => reject(err));
  });
}

export function registerDiagnosticsListener(callback: Callback<AgentDiagnostics>): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.registerDiagnosticsListener(
      (data) => { callback(data); resolve(); },
      (err) => reject(err)
    );
  });
}

export function getSessionId(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.getSessionId((id) => resolve(id), (err) => reject(err));
  });
}

export function getBrowserId(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.getBrowserId((id) => resolve(id), (err) => reject(err));
  });
}

export function getParentId(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.getParentId((id) => resolve(id), (err) => reject(err));
  });
}

export function getApplicationHostname(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.getApplicationHostname((h) => resolve(h), (err) => reject(err));
  });
}

export function getVersion(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.getVersion((v) => resolve(v), (err) => reject(err));
  });
}

export function getDeviceId(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.getDeviceId((id) => resolve(id), (err) => reject(err));
  });
}

export function setLocation(location: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.setLocation((r) => resolve(r), (err) => reject(err), location);
  });
}

export function setAppSessionId(appSessionId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.setAppSessionId((r) => resolve(r), (err) => reject(err), appSessionId);
  });
}

export function setUserId(userId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.setUserId((r) => resolve(r), (err) => reject(err), userId);
  });
}

export function setAppDeviceId(appDeviceId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.setAppDeviceId((r) => resolve(r), (err) => reject(err), appDeviceId);
  });
}

export function registerLocationListener(
  provider?: string,
  minTime?: number,
  minDistance?: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isCleafyAvailable()) return reject("Cleafy plugin not available");
    window.Cleafy!.registerLocationListener(() => resolve(), (err) => reject(err), provider, minTime, minDistance);
  });
}
