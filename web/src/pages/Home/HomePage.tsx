import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import PrimaryButton from '../../components/PrimaryButton';
import { useCleafy } from '../../hooks/useCleafy';
import { CleafyConfiguration } from '../../services/cleafy';
import './HomePage.rules.scss';

const DEFAULT_CONFIG: CleafyConfiguration = {
  apiEndpoint: "https://c4cs1.cleafy.cloud",
  applicationHostname: "test.cesar.com:8089",
  isDefaultEnabled: true,
  automaticUpdateAnalysis: 'NONE',
  emulatorDebugAnalysis: 'NONE',
  isPackageAnalysisEnabled: true,
  isExtendedPackageInformation: false,
  isSensitiveIdentifierCollectionEnabled: true,
  isHashSensitiveIdentifiers: false,
  isAllowUntrustedCertificates: false,
  detectorsConfiguration: {
    isHttpDetectorEnabled: false,
    isCertDetectorEnabled: false,
    certDetectorEndpoint: "https://c4cs1.cleafy.cloud",
    isMonitoredAppEnabled: true,
    isActivityDetectorEnabled: false,
    isAdvancedHttpCertDetectorEnabled: false,
    isRootDetectorEnabled: true,
    isTaskInjectionEnabled: false,
    isMockLocationDetectorEnabled: true,
    isAdvancedMockLocationDetectorEnabled: false,
    isOnCallDetectorEnabled: true,
    isHumanDetectorEnabled: false,
  },
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const cleafy = useCleafy();
  const [userId, setUserIdInput] = useState('');

  const handleInit = () => cleafy.initialize(DEFAULT_CONFIG);
  const handleFetchInfo = () => cleafy.fetchInfo();
  const handleDiagnostics = () => cleafy.fetchDiagnostics();
  const handleUpdateDetection = () => cleafy.updateDetection();
  const handleInvalidateSession = () => cleafy.invalidateSession();
  const handleSetUserId = () => {
    if (userId.trim()) cleafy.setUserId(userId.trim());
  };
  const handleLocationListener = () => cleafy.registerLocationListener();

  return (
    <div className="home-layout">
      <main className="home-main">
        <div className="home-page-wrapper">
          <h2>Home Page</h2>
          <p>Welcome to the home page.</p>
          <PrimaryButton onClick={() => navigate('/other')}>Go to Other Page</PrimaryButton>

          <div className="cleafy-section">
            <h3>Cleafy SDK</h3>
            <p className="cleafy-status">
              Status: {cleafy.available
                ? (cleafy.initialized ? 'Initialized' : 'Available (not initialized)')
                : 'Not available (run in Cordova)'}
            </p>

            {cleafy.error && <p className="cleafy-error">{cleafy.error}</p>}

            <div className="cleafy-actions">
              <PrimaryButton onClick={handleInit} disabled={cleafy.loading || !cleafy.available}>
                Init Cleafy
              </PrimaryButton>
              <PrimaryButton onClick={handleFetchInfo} disabled={cleafy.loading || !cleafy.available}>
                Get Info
              </PrimaryButton>
              <PrimaryButton onClick={handleDiagnostics} disabled={cleafy.loading || !cleafy.available}>
                Diagnostics
              </PrimaryButton>
              <PrimaryButton onClick={handleUpdateDetection} disabled={cleafy.loading || !cleafy.available}>
                Update Detection
              </PrimaryButton>
              <PrimaryButton onClick={handleInvalidateSession} disabled={cleafy.loading || !cleafy.available}>
                Invalidate Session
              </PrimaryButton>
              <PrimaryButton onClick={handleLocationListener} disabled={cleafy.loading || !cleafy.available}>
                Register Location
              </PrimaryButton>
            </div>

            <div className="cleafy-userid-row">
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserIdInput(e.target.value)}
              />
              <PrimaryButton onClick={handleSetUserId} disabled={cleafy.loading || !cleafy.available || !userId.trim()}>
                Set User ID
              </PrimaryButton>
            </div>

            {(cleafy.sessionId || cleafy.browserId || cleafy.deviceId || cleafy.version) && (
              <div className="cleafy-info">
                <h4>Agent Info</h4>
                {cleafy.version && <p><strong>Version:</strong> {cleafy.version}</p>}
                {cleafy.sessionId && <p><strong>Session ID:</strong> {cleafy.sessionId}</p>}
                {cleafy.browserId && <p><strong>Browser ID:</strong> {cleafy.browserId}</p>}
                {cleafy.deviceId && <p><strong>Device ID:</strong> {cleafy.deviceId}</p>}
              </div>
            )}

            {cleafy.diagnostics && (
              <div className="cleafy-info">
                <h4>Diagnostics</h4>
                <p><strong>Device ID:</strong> {cleafy.diagnostics.deviceId}</p>
                <p><strong>Successful probes:</strong> {cleafy.diagnostics.successfulProbeSubmissions}</p>
                <p><strong>Failed probes:</strong> {cleafy.diagnostics.failedProbeSubmissions}</p>
                {cleafy.diagnostics.errors.length > 0 && (
                  <p><strong>Errors:</strong> {cleafy.diagnostics.errors.join(', ')}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
