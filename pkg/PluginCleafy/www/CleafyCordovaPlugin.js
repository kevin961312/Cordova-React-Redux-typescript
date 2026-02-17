"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLocationListener = exports.setAppDeviceId = exports.setUserId = exports.setAppSessionId = exports.setLocation = exports.getDeviceId = exports.getVersion = exports.getApplicationHostname = exports.getParentId = exports.getBrowserId = exports.getSessionId = exports.registerDiagnosticsListener = exports.getDiagnostics = exports.updateDetection = exports.invalidateSession = exports.initWithConfiguration = void 0;
var cordova = require("cordova");
var PluginService = "CleafyCordovaPlugin";
function initWithConfiguration(onSuccess, onError, _a) {
    var apiEndpoint = _a.apiEndpoint, applicationHostname = _a.applicationHostname, _b = _a.integrationToken, integrationToken = _b === void 0 ? "" : _b, _c = _a.isDefaultEnabled, isDefaultEnabled = _c === void 0 ? true : _c, _d = _a.automaticUpdateAnalysis, automaticUpdateAnalysis = _d === void 0 ? "NONE" : _d, _e = _a.emulatorDebugAnalysis, emulatorDebugAnalysis = _e === void 0 ? "NONE" : _e, _f = _a.isPackageAnalysisEnabled, isPackageAnalysisEnabled = _f === void 0 ? true : _f, _g = _a.isExtendedPackageInformation, isExtendedPackageInformation = _g === void 0 ? false : _g, _h = _a.isSensitiveIdentifierCollectionEnabled, isSensitiveIdentifierCollectionEnabled = _h === void 0 ? true : _h, _j = _a.isHashSensitiveIdentifiers, isHashSensitiveIdentifiers = _j === void 0 ? false : _j, _k = _a.isAllowUntrustedCertificates, isAllowUntrustedCertificates = _k === void 0 ? false : _k, _l = _a.detectorsConfiguration, _m = _l.isHttpDetectorEnabled, isHttpDetectorEnabled = _m === void 0 ? false : _m, _o = _l.isCertDetectorEnabled, isCertDetectorEnabled = _o === void 0 ? false : _o, _p = _l.certDetectorEndpoint, certDetectorEndpoint = _p === void 0 ? "" : _p, _q = _l.isMonitoredAppEnabled, isMonitoredAppEnabled = _q === void 0 ? true : _q, _r = _l.isActivityDetectorEnabled, isActivityDetectorEnabled = _r === void 0 ? false : _r, _s = _l.isAdvancedHttpCertDetectorEnabled, isAdvancedHttpCertDetectorEnabled = _s === void 0 ? false : _s, _t = _l.isRootDetectorEnabled, isRootDetectorEnabled = _t === void 0 ? true : _t, _u = _l.isTaskInjectionEnabled, isTaskInjectionEnabled = _u === void 0 ? false : _u, _v = _l.isMockLocationDetectorEnabled, isMockLocationDetectorEnabled = _v === void 0 ? true : _v, _w = _l.isAdvancedMockLocationDetectorEnabled, isAdvancedMockLocationDetectorEnabled = _w === void 0 ? false : _w, _x = _l.isOnCallDetectorEnabled, isOnCallDetectorEnabled = _x === void 0 ? true : _x, _y = _l.isHumanDetectorEnabled, isHumanDetectorEnabled = _y === void 0 ? false : _y, _z = _l.isNfcDetectorEnabled, isNfcDetectorEnabled = _z === void 0 ? true : _z, _0 = _l.isGpsDetectorEnabled, isGpsDetectorEnabled = _0 === void 0 ? false : _0;
    var configuration = {
        apiEndpoint: apiEndpoint,
        applicationHostname: applicationHostname,
        integrationToken: integrationToken,
        isDefaultEnabled: isDefaultEnabled,
        automaticUpdateAnalysis: automaticUpdateAnalysis,
        emulatorDebugAnalysis: emulatorDebugAnalysis,
        isPackageAnalysisEnabled: isPackageAnalysisEnabled,
        isExtendedPackageInformation: isExtendedPackageInformation,
        isSensitiveIdentifierCollectionEnabled: isSensitiveIdentifierCollectionEnabled,
        isHashSensitiveIdentifiers: isHashSensitiveIdentifiers,
        isAllowUntrustedCertificates: isAllowUntrustedCertificates,
        detectorsConfiguration: {
            isHttpDetectorEnabled: isHttpDetectorEnabled,
            isCertDetectorEnabled: isCertDetectorEnabled,
            certDetectorEndpoint: certDetectorEndpoint,
            isMonitoredAppEnabled: isMonitoredAppEnabled,
            isActivityDetectorEnabled: isActivityDetectorEnabled,
            isAdvancedHttpCertDetectorEnabled: isAdvancedHttpCertDetectorEnabled,
            isRootDetectorEnabled: isRootDetectorEnabled,
            isTaskInjectionEnabled: isTaskInjectionEnabled,
            isMockLocationDetectorEnabled: isMockLocationDetectorEnabled,
            isAdvancedMockLocationDetectorEnabled: isAdvancedMockLocationDetectorEnabled,
            isOnCallDetectorEnabled: isOnCallDetectorEnabled,
            isHumanDetectorEnabled: isHumanDetectorEnabled,
            isNfcDetectorEnabled: isNfcDetectorEnabled,
            isGpsDetectorEnabled: isGpsDetectorEnabled
        },
    };
    cordova.exec(onSuccess, onError, PluginService, "initWithConfiguration", [configuration]);
}
exports.initWithConfiguration = initWithConfiguration;
function invalidateSession(onSuccess, onError) {
    cordova.exec(onSuccess, onError, PluginService, "invalidateSession");
}
exports.invalidateSession = invalidateSession;
function updateDetection(onSuccess, onError) {
    cordova.exec(onSuccess, onError, PluginService, "updateDetection");
}
exports.updateDetection = updateDetection;
function getDiagnostics(onSuccess, onError) {
    cordova.exec(onSuccess, onError, PluginService, "getDiagnostics");
}
exports.getDiagnostics = getDiagnostics;
function registerDiagnosticsListener(onSuccess, onError) {
    cordova.exec(onSuccess, onError, PluginService, "registerDiagnosticsListener");
}
exports.registerDiagnosticsListener = registerDiagnosticsListener;
function getSessionId(onSuccess, onError) {
    cordova.exec(onSuccess, onError, PluginService, "getSessionId");
}
exports.getSessionId = getSessionId;
function getBrowserId(onSuccess, onError) {
    cordova.exec(onSuccess, onError, PluginService, "getBrowserId");
}
exports.getBrowserId = getBrowserId;
function getParentId(onSuccess, onError) {
    cordova.exec(onSuccess, onError, PluginService, "getParentId");
}
exports.getParentId = getParentId;
function getApplicationHostname(onSuccess, onError) {
    cordova.exec(onSuccess, onError, PluginService, "getApplicationHostname");
}
exports.getApplicationHostname = getApplicationHostname;
function getVersion(onSuccess, onError) {
    cordova.exec(onSuccess, onError, PluginService, "getVersion");
}
exports.getVersion = getVersion;
function getDeviceId(onSuccess, onError) {
    cordova.exec(onSuccess, onError, PluginService, "getDeviceId");
}
exports.getDeviceId = getDeviceId;
function setLocation(onSuccess, onError, location) {
    cordova.exec(onSuccess, onError, PluginService, "setLocation", [location]);
}
exports.setLocation = setLocation;
function setAppSessionId(onSuccess, onError, appSessionId) {
    cordova.exec(onSuccess, onError, PluginService, "setAppSessionId", [appSessionId]);
}
exports.setAppSessionId = setAppSessionId;
function setUserId(onSuccess, onError, userId) {
    cordova.exec(onSuccess, onError, PluginService, "setUserId", [userId]);
}
exports.setUserId = setUserId;
function setAppDeviceId(onSuccess, onError, appDeviceId) {
    cordova.exec(onSuccess, onError, PluginService, "setAppDeviceId", [appDeviceId]);
}
exports.setAppDeviceId = setAppDeviceId;
function registerLocationListener(onSuccess, onError, provider, minTime, minDistance) {
    if (cordova.platformId !== "android") {
        onSuccess();
        return;
    }
    cordova.exec(onSuccess, onError, PluginService, "registerLocationListener", [provider !== null && provider !== void 0 ? provider : null, minTime !== null && minTime !== void 0 ? minTime : null, minDistance !== null && minDistance !== void 0 ? minDistance : null]);
}
exports.registerLocationListener = registerLocationListener;
