import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'subjects',
                title    : 'Subjects',
                translate: 'NAV.SUBJECTS',
                type     : 'item',
                icon     : 'subject',
                url      : '/pages/subject',
            }
        ]
    }
];
