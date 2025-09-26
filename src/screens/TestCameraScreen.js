import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { 
  Appbar, 
  Button,
  Surface 
} from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';

export default function TestCameraScreen({ navigation, route }) {
  const { testId } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(false);
  };

  // Handle JavaScript messages from the webpage
  const handleMessage = (event) => {
    const message = event.nativeEvent.data;
    console.log('WebView message:', message);
    
    // If we receive any message indicating completion or alert, navigate back
    if (message.includes('alert') || message.includes('complete') || message.includes('finished')) {
      navigation.goBack();
    }
  };

  // Inject JavaScript to intercept alerts and send messages to React Native
  const injectedJavaScript = `
    (function() {
      // Override the default alert function
      const originalAlert = window.alert;
      window.alert = function(message) {
        // Send message to React Native instead of showing alert
        window.ReactNativeWebView.postMessage('alert:' + message);
        return true; // Prevent the default alert
      };

      // Also intercept confirm dialogs
      const originalConfirm = window.confirm;
      window.confirm = function(message) {
        window.ReactNativeWebView.postMessage('confirm:' + message);
        return true; // Auto-confirm
      };

      // Listen for any completion events or form submissions
      document.addEventListener('DOMContentLoaded', function() {
        // Listen for test completion indicators
        const observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
              // Check for completion messages or success indicators
              const completionIndicators = [
                'test complete', 'test finished', 'completed', 'success',
                'done', 'finished', 'submit', 'result'
              ];
              
              const textContent = document.body.textContent.toLowerCase();
              completionIndicators.forEach(function(indicator) {
                if (textContent.includes(indicator)) {
                  window.ReactNativeWebView.postMessage('completion_detected:' + indicator);
                }
              });
            }
          });
        });
        
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      });

      true; // Note: this is required for iOS
    })();
  `;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>

      <View style={styles.content}>
        {error ? (
          <Surface style={styles.errorContainer} elevation={2}>
            <View style={styles.errorContent}>
              <MaterialIcons name="wifi-off" size={48} color={Colors.error} />
              <Text style={styles.errorTitle}>Connection Error</Text>
              <Text style={styles.errorDescription}>
                Unable to load the Drona fitness test. Please check your internet connection.
              </Text>
              <Button 
                mode="contained" 
                onPress={handleRefresh}
                style={styles.retryButton}
                icon="refresh"
              >
                Try Again
              </Button>
            </View>
          </Surface>
        ) : (
          <>
            <WebView
              source={{ uri: 'https://drona-official.web.app/' }}
              style={styles.webview}
              onLoadEnd={handleLoadEnd}
              onError={handleError}
              onMessage={handleMessage}
              injectedJavaScript={injectedJavaScript}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={Colors.primary} />
                  <Text style={styles.loadingText}>Loading Drona Fitness Test...</Text>
                </View>
              )}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              mixedContentMode="compatibility"
              allowsBackForwardNavigationGestures={false}
            />
            
            {loading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Loading Drona Fitness Test...</Text>
              </View>
            )}
          </>
        )}
        
        {/* Quick Actions
        <Surface style={styles.actionsContainer} elevation={3}>
          <View style={styles.actionsContent}>
            <Button 
              mode="outlined" 
              onPress={() => navigation.goBack()}
              style={styles.actionButton}
              compact
            >
              Cancel Test
            </Button>
            <Button 
              mode="contained" 
              onPress={() => navigation.navigate('TestResults', { 
                testId, 
                results: { score: 28, reps: 28, form: 87 } 
              })}
              style={styles.actionButton}
              compact
            >
              Complete Test
            </Button>
          </View>
        </Surface> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: { 
    backgroundColor: Colors.surface, 
    elevation: 0 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: Colors.onSurface 
  },
  content: { 
    flex: 1, 
    position: 'relative' 
  },
  webview: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 16,
    backgroundColor: Colors.surface,
  },
  errorContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.error,
    marginTop: 16,
    marginBottom: 8,
  },
  errorDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    borderRadius: 24,
    paddingHorizontal: 24,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  actionsContent: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 24,
  },
});