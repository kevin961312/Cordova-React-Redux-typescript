import { useState, useEffect, useCallback } from 'react';
import {
  isCleafyAvailable,
  initWithConfiguration,
  invalidateSession,
  updateDetection,
  getDiagnostics,
  getSessionId,
  getBrowserId,
  getDeviceId,
  getVersion,
  setUserId,
  registerLocationListener,
  CleafyConfiguration,
  AgentDiagnostics,
} from '../services/cleafy';

export interface CleafyState {
  available: boolean;
  initialized: boolean;
  sessionId: string | null;
  browserId: string | null;
  deviceId: string | null;
  version: string | null;
  diagnostics: AgentDiagnostics | null;
  error: string | null;
  loading: boolean;
}

export function useCleafy() {
  const [state, setState] = useState<CleafyState>({
    available: false,
    initialized: false,
    sessionId: null,
    browserId: null,
    deviceId: null,
    version: null,
    diagnostics: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const checkAvailability = () => {
      setState((prev) => ({ ...prev, available: isCleafyAvailable() }));
    };

    // Check immediately
    checkAvailability();

    // Also check after deviceready (Cordova plugins are available after this event)
    document.addEventListener('deviceready', checkAvailability, false);
    return () => {
      document.removeEventListener('deviceready', checkAvailability);
    };
  }, []);

  const initialize = useCallback(async (config: CleafyConfiguration) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await initWithConfiguration(config);
      setState((prev) => ({ ...prev, initialized: true, loading: false }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: String(err), loading: false }));
    }
  }, []);

  const fetchInfo = useCallback(async () => {
    if (!isCleafyAvailable()) return;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const [sid, bid, did, ver] = await Promise.all([
        getSessionId(),
        getBrowserId(),
        getDeviceId(),
        getVersion(),
      ]);
      setState((prev) => ({
        ...prev,
        sessionId: sid,
        browserId: bid,
        deviceId: did,
        version: ver,
        loading: false,
      }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: String(err), loading: false }));
    }
  }, []);

  const fetchDiagnostics = useCallback(async () => {
    if (!isCleafyAvailable()) return;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const diag = await getDiagnostics();
      console.log('Diagnostics fetched:', JSON.stringify(diag, null, 2));
      setState((prev) => ({ ...prev, diagnostics: diag, loading: false }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: String(err), loading: false }));
    }
  }, []);

  const doInvalidateSession = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await invalidateSession();
      setState((prev) => ({ ...prev, sessionId: null, initialized: false, loading: false }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: String(err), loading: false }));
    }
  }, []);

  const doUpdateDetection = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await updateDetection();
      setState((prev) => ({ ...prev, loading: false }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: String(err), loading: false }));
    }
  }, []);

  const doSetUserId = useCallback(async (userId: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await setUserId(userId);
      setState((prev) => ({ ...prev, loading: false }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: String(err), loading: false }));
    }
  }, []);

  const doRegisterLocationListener = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await registerLocationListener();
      setState((prev) => ({ ...prev, loading: false }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: String(err), loading: false }));
    }
  }, []);

  return {
    ...state,
    initialize,
    fetchInfo,
    fetchDiagnostics,
    invalidateSession: doInvalidateSession,
    updateDetection: doUpdateDetection,
    setUserId: doSetUserId,
    registerLocationListener: doRegisterLocationListener,
  };
}
