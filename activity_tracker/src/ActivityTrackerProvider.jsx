import React, { createContext, useEffect, useState } from 'react';

// Create Context for tracking
export const ActivityTrackerContext = createContext();

// Main Provider Component
const ActivityTrackerProvider = ({ children, customTrackers = {} }) => {
    const [activityLog, setActivityLog] = useState([]);

    // Function to log activity
    const logActivity = (eventType, details) => {
        setActivityLog(prevLog => [
            ...prevLog,
            { eventType, details, timestamp: new Date().toISOString() }
        ]);
    };

    // Predefined tracking functions
    const trackPageView = (details = {}) =>
        logActivity('page_view', { url: window.location.href, pageTitle: document.title, referrer: document.referrer, ...details });

    const trackClick = (details = {}) =>
        logActivity('click', { x: details.x, y: details.y, elementId: details.elementId, elementClass: details.elementClass, ...details });

    const trackScroll = (details = {}) =>
        logActivity('scroll', { scrollY: window.scrollY, percentageScrolled: (window.scrollY / document.body.scrollHeight) * 100, ...details });

    const trackProductView = (details = {}) =>
        logActivity('product_view', { ...details });

    const trackAddToCart = (details = {}) =>
        logActivity('add_to_cart', { ...details });

    const trackRemoveFromCart = (details = {}) =>
        logActivity('remove_from_cart', { ...details });

    const trackCheckoutStep = (details = {}) =>
        logActivity('checkout_step', { step: details.step, cartItems: details.cartItems, cartTotal: details.cartTotal, ...details });

    const trackPurchaseComplete = (details = {}) =>
        logActivity('purchase_complete', { orderId: details.orderId, cartItems: details.cartItems, totalAmount: details.totalAmount, ...details });

    const trackFormSubmission = (details = {}) =>
        logActivity('form_submission', { formId: details.formId, formName: details.formName, fieldsSubmitted: details.fieldsSubmitted, ...details });
    
    const trackVideoInteraction = (details = {}) =>
        logActivity('video_interaction', { videoId: details.videoId, action: details.action, currentTime: details.currentTime, ...details });
    
    const trackHover = (details = {}) =>
        logActivity('hover', { elementId: details.elementId, elementType: details.elementType, ...details });
    
    const trackSessionStart = (details = {}) =>
        logActivity('session_start', { userId: details.userId, sessionId: details.sessionId, deviceType: details.deviceType, ...details });
    
    const trackSessionEnd = (details = {}) =>
        logActivity('session_end', { userId: details.userId, sessionId: details.sessionId, duration: details.duration, ...details });
    
    const trackImageCarouselInteraction = (details = {}) =>
        logActivity('carousel_interaction', { carouselId: details.carouselId, action: details.action, itemIndex: details.itemIndex, ...details });
    
    const trackTimeOnPage = (details = {}) =>
        logActivity('time_on_page', { page: details.page, timeSpent: details.timeSpent, ...details });
    
    const trackSearchInteraction = (details = {}) =>
        logActivity('search_interaction', { searchTerm: details.searchTerm, resultClicked: details.resultClicked, resultsCount: details.resultsCount, ...details });
    
    const trackTabSwitch = (details = {}) =>
        logActivity('tab_switch', { tabId: details.tabId, previousTabId: details.previousTabId, ...details });
    
    const trackSocialShare = (details = {}) =>
        logActivity('social_share', { platform: details.platform, contentId: details.contentId, ...details });
    
    const trackUserFeedback = (details = {}) =>
        logActivity('user_feedback', { feedbackType: details.feedbackType, feedbackDetails: details.feedbackDetails, itemId: details.itemId, ...details });

    // Combine built-in functions with user-defined functions
    const combinedTrackers = {
        logActivity,  // Allows direct logging
        trackPageView,
        trackClick,
        trackScroll,
        trackProductView,
        trackAddToCart,
        trackRemoveFromCart,
        trackCheckoutStep,
        trackPurchaseComplete,
        trackFormSubmission,
        trackVideoInteraction,
        trackHover,
        trackSessionStart,
        trackSessionEnd,
        trackImageCarouselInteraction,
        trackTimeOnPage,
        trackSearchInteraction,
        trackTabSwitch,
        trackSocialShare,
        trackUserFeedback,
        ...customTrackers // Spread custom trackers passed in by user
    };

    useEffect(() => {
        const handleClick = (e) => trackClick({ x: e.clientX, y: e.clientY });
        const handleScroll = () => trackScroll();
        const handlePageShow = () => logActivity('page_show', { timestamp: new Date().toISOString() });
        const handlePageHide = () => logActivity('page_hide', { timestamp: new Date().toISOString() });
        const handleError = (error) => logActivity('error', { message: error.message, stack: error.error?.stack });
        const handleUnhandledRejection = (event) => logActivity('unhandledrejection', { reason: event.reason });

        window.addEventListener('click', handleClick);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('pageshow', handlePageShow);
        window.addEventListener('pagehide', handlePageHide);
        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            window.removeEventListener('click', handleClick);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('pageshow', handlePageShow);
            window.removeEventListener('pagehide', handlePageHide);
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);

    return (
        <ActivityTrackerContext.Provider value={{
            activityLog,
            ...combinedTrackers
        }}>
            {children}
        </ActivityTrackerContext.Provider>
    );
};

export default ActivityTrackerProvider;
