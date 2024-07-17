export const EVENT_TYPE = {
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE",
} as const;

export type TypeEvent = (typeof EVENT_TYPE)[keyof typeof EVENT_TYPE];

export const EVENT_STATUS = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
} as const;

export type Status = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];

export const ROLE = {
    ADMIN: "ADMIN",
    USER: "USER",
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];