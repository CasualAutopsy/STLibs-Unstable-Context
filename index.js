import { SlashCommandClosure } from '../../../slash-commands/SlashCommandClosure.js';
import { SlashCommandBreakController } from '../../../slash-commands/SlashCommandBreakController.js';
import { SlashCommandNamedArgumentAssignment } from '../../../slash-commands/SlashCommandNamedArgumentAssignment.js';

import { commonEnumProviders, commonEnumMatchProviders, enumIcons } from '../../../slash-commands/SlashCommandCommonEnumsProvider.js';
import { enumTypes } from '../../../slash-commands/SlashCommandEnumValue.js';

import { isTrueBoolean, isFalseBoolean } from '../../../utils.js';



export function getUnstableSTContext() {
    return {
        // Slash Command Classes
        SlashCommandClosure,
        SlashCommandBreakController,
        SlashCommandNamedArgumentAssignment,

        // Slash Command Enums
        commonEnumProviders, commonEnumMatchProviders,
        enumIcons, enumTypes,

        // Utilities
        isTrueBoolean, isFalseBoolean,
    };
}

globalThis.getUnstableSTContext = getUnstableSTContext;
