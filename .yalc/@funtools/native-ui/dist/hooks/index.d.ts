import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { PermissionStatus, Permission } from 'react-native';

type RenderModalUIProps = (props: {
    requestPermission: () => void;
    permissionStatus: PermissionStatus;
    permission: Permission;
    setIsModalVisible: (visible: boolean) => void;
    content: {
        title: string;
        description: string;
    };
}) => ReactNode;
type usePermissionProps = {
    permission: Permission;
    onDeny?: () => void;
    autoRequest?: boolean;
    onGrant?: () => void;
    modalDescription?: string;
    renderModalUI?: RenderModalUIProps;
};
declare function usePermission({ permission, autoRequest, onDeny, onGrant, modalDescription, renderModalUI }: usePermissionProps): {
    requestPermission: () => Promise<void>;
    permissionStatus: PermissionStatus;
    PermissionModal: () => react_jsx_runtime.JSX.Element;
};

export { type RenderModalUIProps, usePermission, type usePermissionProps };
