interface Point {
    month: string;
    score: number;
}

export enum EExternalData {
    Base = 'Base',
    Peak = 'Peak',
    ExtendedPeak = 'Extended peak',
}
export type ExternalSingle = {
    color:string,
    name:'Base' |'Peak' | 'ExtendedPeak',
    data:Point[]
}
export type ExternalDataType = ExternalSingle[]

const operators = new Map(
    Object.entries(EExternalData)
        .map(entry => entry.reverse()) as [EExternalData, keyof typeof EExternalData][]
);

export const externalData:ExternalDataType = [
     {
        color: '#82E1D7',
        name: operators.get(EExternalData.Base)!,
        data: [{
            month: 'AUG',
            score: 50

        }, {
            month: 'SEPT',
            score: 55

        }, {
            month: 'OCT',
            score: 52

        },
        ]
    },
    {
        color: '#C98BDB',
        name: operators.get(EExternalData.Peak)!,
        data: [{
            month: 'AUG',
            score: 45

        }, {
            month: 'SEPT',
            score: 52

        }, {
            month: 'OCT',
            score: 43

        }]
    },
    {
        color: '#FF7BEA',
        name: operators.get(EExternalData.ExtendedPeak)!,
        data: [{
            month: 'AUG',
            score: 56

        }, {
            month: 'SEPT',
            score: 48

        }, {
            month: 'OCT',
            score: 46

        }]
    },
]

const data1: Point[][] = [
    [{
        month: 'AUG',
        score: 50

    }, {
        month: 'SEPT',
        score: 55

    }, {
        month: 'OCT',
        score: 52

    },
    ],
    [{
        month: 'AUG',
        score: 45

    }, {
        month: 'SEPT',
        score: 52

    }, {
        month: 'OCT',
        score: 43

    },
    ],
];

export {data1};
