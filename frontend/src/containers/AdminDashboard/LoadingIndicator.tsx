import React from 'react';
type LoadingIndicatorProps = {
    loading: boolean;
};
export function LoadingIndicator(props: LoadingIndicatorProps) {
    const {
        loading,
    } = props;
    if (!loading) return null;
    return (
        <div className="loading is-vcentered">Loading...</div>
    );
}