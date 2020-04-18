import { observable } from 'mobx';
import { ResourceCardProps } from 'screens/CardDisplay/ResourceCard';
import { WorkerStore } from './WorkerStore';

export const WORKER_MULTIPLIER_FOR_PROGRESS = 1;
export const TICK_WORKER_MULTIPLIER = 0.2;

export class CardDataStore {
    private workerStore: WorkerStore;

    constructor(workerStore: WorkerStore) {
        this.workerStore = workerStore;
    }

    @observable public cardDisplay: ResourceCardProps[] = [
        {
            id: '12341582395072',
            name: 'Simple Cow',
            starCount: 3,
            currentXP: 15235,
            workers: 0,
            cycleProgress: 0,
            unitsPerCycleMin: 1,
            unitsPerCycleMax: 10,
            xpPerCycle: 25,
            progressPerCycle: 10,
            cycleMax: 120,
            lastUpdatedTick: 0,
            tickCountForProgress: 21,
        },
        {
            id: '12341582asdf395072',
            name: 'Simple Cow',
            starCount: 3,
            currentXP: 15235,
            workers: 0,
            cycleProgress: 0,
            unitsPerCycleMin: 1,
            unitsPerCycleMax: 10,
            xpPerCycle: 25,
            progressPerCycle: 10,
            cycleMax: 120,
            lastUpdatedTick: 0,
            tickCountForProgress: 21,
        },
    ];

    private currentTick = 0;

    public setStartTick(tick: number) {
        this.currentTick = tick;
    }

    public onTickUpdate(newTick: number) {
        this.currentTick = newTick;

        this.cardDisplay = this.cardDisplay.map((card) => {
            let cardUpdate = { ...card };
            let workerMultiplier = card.workers * WORKER_MULTIPLIER_FOR_PROGRESS;
            let cardCanUpdate =
                newTick >= card.tickCountForProgress - TICK_WORKER_MULTIPLIER * card.workers + card.lastUpdatedTick &&
                card.workers != 0;

            if (cardCanUpdate) {
                let cycleProgress = card.cycleProgress + card.progressPerCycle;
                cardUpdate.lastUpdatedTick = newTick;
                if (cycleProgress >= card.cycleMax) {
                    let leftOver = cycleProgress - card.cycleMax;
                    cardUpdate.cycleProgress = leftOver;
                    cardUpdate.currentXP = cardUpdate.currentXP + card.xpPerCycle * workerMultiplier;
                    // ADD UNITS TO INVENTORY HERE!
                } else {
                    cardUpdate.cycleProgress = cycleProgress;
                }
            }

            return cardUpdate;
        });
    }

    public addWorkersToCard = (id: string, value: number) => {
        let incrementedValue = this.workerStore.requestWorkers(value);

        this.cardDisplay = this.cardDisplay.map((card) => {
            if (card.id == id) {
                let updatedCard = { ...card };
                updatedCard.workers = updatedCard.workers + incrementedValue;
                return updatedCard;
            }

            return card;
        });
    };
}
