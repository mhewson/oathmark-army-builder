import * as dwarfTerrains from "./terrains/dwarfTerrains.json";
import * as humanTerrains from "./terrains/humanTerrains.json";
import * as elfTerrains from "./terrains/elfTerrains.json";
import * as orcTerrains from "./terrains/orcTerrains.json";
import * as goblinTerrains from "./terrains/goblinTerrains.json";
import * as unalignedTerrains from "./terrains/unalignedTerrains.json";
import TroopSelection from "./troopSelection";
import Terrain from "./models/terrain";
import SelectedTerrain from "./models/selectedTerrain";

class RegionSelection {
    private terrains_1: Array<Terrain>;
    private terrains_2: Array<Terrain>;
    private terrains_3: Array<Terrain>;
    private terrains_4: Array<Terrain>;
    private terrains_5: Array<Terrain>;
    private capital: Terrain;
    private chosenTerrains: Array<SelectedTerrain>;
    private terrainLists: Array<Array<Terrain>>;
    private troopSelection: TroopSelection;
    private clear: HTMLButtonElement;

    constructor() {
        this.terrains_1 =  [];
        this.terrains_2 =  [];
        this.terrains_3 =  [];
        this.terrains_4 =  [];
        this.terrains_5 =  [];
        this.chosenTerrains = [];
        this.terrainLists = [dwarfTerrains.list, humanTerrains.list, elfTerrains.list, orcTerrains.list, goblinTerrains.list, unalignedTerrains.list];
        this.clear = <HTMLButtonElement> document.getElementById("clearTerrains");
        this.clear.onclick = () => this.clearTerrains();
    };
    public init(): void { 
        this.terrainLists.forEach((terrainList: Array<Terrain>)=> terrainList.forEach((terrain: Terrain) => {
            if(terrain.region === 1 && terrain.name.toLowerCase().includes('capital')) {
                this.terrains_1.push(terrain);
            }
        }));
        const capitalField: HTMLElement = document.getElementById("capitalButtonField");
        const capitalButton: HTMLElement = document.getElementById('capitalButton');
        capitalField.onclick = () => {
            if (capitalField.innerHTML.trim() !== "Choose Capital") {
                return;
            }
            this.createCapitalSelectionButtons(this.terrains_1, capitalButton, capitalField)
        };
        capitalButton.onclick = () => {
            if (capitalField.innerHTML.trim() !== "Choose Capital") {
                return;
            }
            this.createCapitalSelectionButtons(this.terrains_1, capitalButton, capitalField)
        };
        for (let i:number = 2; i<= 5; i++) {
            for (let j:number = 1; j <= Math.min(i, 4); j++) {
                const terrainButton: HTMLElement = document.getElementById(`region_${i}_${j}`);
                const terrainField: HTMLElement = document.getElementById(`region_${i}_${j}_field`);
                terrainButton.onclick = () => {
                    if(terrainField.innerHTML.trim() !== "Choose Terrain") {
                        return;
                    }
                    const terrainsList = i === 2 ? this.terrains_2 : 
                                        i === 3 ? this.terrains_3 : 
                                        i === 4 ? this.terrains_4 : this.terrains_5;
                    this.createSelectionButtons(terrainsList, terrainButton, terrainField, `${i}_${j}`);
                }
                terrainField.onclick = () => {
                    if(terrainField.innerHTML.trim() !== "Choose Terrain") {
                        return;
                    }
                    const terrainsList = i === 2 ? this.terrains_2 : 
                                        i === 3 ? this.terrains_3 : 
                                        i === 4 ? this.terrains_4 : this.terrains_5;
                    this.createSelectionButtons(terrainsList, terrainButton, terrainField, `${i}_${j}`);
                }
            }
        }
    }

    private createSelectionButtons(list: Array<Terrain>, button: HTMLElement, field: HTMLElement, region: string): void {
        const dwarfTerrainTable: HTMLElement = document.getElementById('dwarfTerrains');
        const humanTerrainTable: HTMLElement = document.getElementById('humanTerrains');
        const elfTerrainTable: HTMLElement = document.getElementById('elfTerrains');
        const orcTerrainTable: HTMLElement = document.getElementById('orcTerrains');
        const goblinTerrainTable: HTMLElement = document.getElementById('goblinTerrains');
        const undeadTerrainTable: HTMLElement = document.getElementById('undeadTerrains');
        const unalignedTerrainTable: HTMLElement = document.getElementById('unalignedTerrains');
        dwarfTerrainTable.innerHTML = '';
        humanTerrainTable.innerHTML = '';
        elfTerrainTable.innerHTML = '';
        orcTerrainTable.innerHTML = '';
        goblinTerrainTable.innerHTML = '';
        undeadTerrainTable.innerHTML = '';
        unalignedTerrainTable.innerHTML = '';
        list.forEach((terrain: Terrain) => {
            if (terrain.unique && this.chosenTerrains.find(chosenTerrain => chosenTerrain.terrain.name === terrain.name)) {
                return;
            }
            const terrainTable: HTMLElement = terrain.race === 'Dwarf' ? dwarfTerrainTable : 
            terrain.race === 'Human' ? humanTerrainTable : 
            terrain.race === 'Elf' ? elfTerrainTable : 
            terrain.race === 'Orc' ? orcTerrainTable :
            terrain.race === 'Goblin' ? goblinTerrainTable :
            terrain.race === 'Undead' ? undeadTerrainTable : unalignedTerrainTable;
            const terrainButton: HTMLButtonElement = document.createElement('button');
            terrainButton.innerHTML = terrain.name;
            terrainButton.className = "btn lightGrey btn-block";
            terrainButton.onclick = () => {
                if (button) {
                    button.style.fill = "white";
                    button.style.cursor = "default";
                    field.style.fill = "black";
                    field.style.cursor = "default";
                    field.innerHTML = terrain.name;
                }
                dwarfTerrainTable.innerHTML = '';
                humanTerrainTable.innerHTML = '';
                elfTerrainTable.innerHTML = '';
                orcTerrainTable.innerHTML = '';
                goblinTerrainTable.innerHTML = '';
                undeadTerrainTable.innerHTML = '';
                unalignedTerrainTable.innerHTML = '';
                this.chosenTerrains.push({terrain: terrain, region: region});
                this.troopSelection.createTable();
                window.location.href="#kingdomSVG";
            };
            terrainTable.appendChild(terrainButton);
        });
        window.location.href="#availableTerrains";
    }

    private createCapitalSelectionButtons(list: Array<Terrain>, button: HTMLElement = null, textField: HTMLElement, region: string = '1'): void {
        const dwarfTerrainTable: HTMLElement = document.getElementById('dwarfTerrains');
        const humanTerrainTable: HTMLElement = document.getElementById('humanTerrains');
        const elfTerrainTable: HTMLElement = document.getElementById('elfTerrains');
        const orcTerrainTable: HTMLElement = document.getElementById('orcTerrains');
        const goblinTerrainTable: HTMLElement = document.getElementById('goblinTerrains');
        const undeadTerrainTable: HTMLElement = document.getElementById('undeadTerrains');
        const unalignedTerrainTable: HTMLElement = document.getElementById('unalignedTerrains');
        dwarfTerrainTable.innerHTML = '';
        humanTerrainTable.innerHTML = '';
        elfTerrainTable.innerHTML = '';
        orcTerrainTable.innerHTML = '';
        goblinTerrainTable.innerHTML = '';
        undeadTerrainTable.innerHTML = '';
        unalignedTerrainTable.innerHTML = '';
        list.forEach((terrain: Terrain) => {
            const terrainTable: HTMLElement = terrain.race === 'Dwarf' ? dwarfTerrainTable : 
            terrain.race === 'Human' ? humanTerrainTable : 
            terrain.race === 'Elf' ? elfTerrainTable : 
            terrain.race === 'Orc' ? orcTerrainTable :
            terrain.race === 'Goblin' ? goblinTerrainTable :
            terrain.race === 'Undead' ? undeadTerrainTable : unalignedTerrainTable;
            const terrainButton: HTMLButtonElement = document.createElement('button');
            terrainButton.innerHTML = terrain.name;
            terrainButton.className = "btn lightGrey btn-block";
            terrainButton.onclick = () => {
                if (button) {
                    button.style.fill = "white";
                    button.style.cursor = "default";
                    textField.style.fill = "black";
                    textField.style.cursor = "default";
                    textField.innerHTML = terrain.name;
                }
                dwarfTerrainTable.innerHTML = '';
                humanTerrainTable.innerHTML = '';
                elfTerrainTable.innerHTML = '';
                orcTerrainTable.innerHTML = '';
                goblinTerrainTable.innerHTML = '';
                undeadTerrainTable.innerHTML = '';
                unalignedTerrainTable.innerHTML = '';
                this.capital = terrain;
                this.chosenTerrains.push({terrain: terrain, region: region});
                this.fillRegions();
                Array.from(document.getElementsByClassName('outerRing')).forEach((div: HTMLElement) => {
                    div.style.display = "block";
                });
                this.troopSelection.createTable();
                window.location.href="#kingdomSVG";
            };
            terrainTable.appendChild(terrainButton);
        });
        window.location.href="#availableTerrains";
    }

    private fillRegions(): void {
        const isSameRace: Function = (secondRace: string) => this.capital.race === secondRace || (['Orc', 'Goblin'].includes(this.capital.race) && ['Orc', 'Goblin'].includes(secondRace));
        this.terrainLists.forEach((terrainList: Array<Terrain>) => terrainList.forEach((terrain: Terrain) => {
            switch (terrain.region) {
                case 1:
                    if (!terrain.name.toLowerCase().includes('capital')) {
                        this.terrains_2.push(terrain);
                        this.terrains_3.push(terrain);
                        this.terrains_4.push(terrain);
                        this.terrains_5.push(terrain);
                    }
                    break;
                case 2:
                    if (isSameRace(terrain.race)) {
                        this.terrains_2.push(terrain);
                    }
                    this.terrains_3.push(terrain);
                    this.terrains_4.push(terrain);
                    this.terrains_5.push(terrain);
                    break;
                case 3:
                    if (isSameRace(terrain.race)) {
                        this.terrains_3.push(terrain);
                    }
                    this.terrains_4.push(terrain);
                    this.terrains_5.push(terrain); 
                    break;
                case 4:
                    if (isSameRace(terrain.race)) {
                        this.terrains_4.push(terrain);
                    }
                    this.terrains_5.push(terrain); 
                    break;   
                case 5:
                    if (isSameRace(terrain.race)) {
                        this.terrains_5.push(terrain);
                    }
                    break;
                default:
                    break;
            }
        }));
    }

    public getChosenTerrains(): Array<SelectedTerrain> {
        return this.chosenTerrains;
    }

    public setTroopSelection(troopSelection: TroopSelection): void {
        this.troopSelection = troopSelection;
    }

    public clearTerrains(): void {
        this.terrains_1 =  [];
        this.terrains_2 =  [];
        this.terrains_3 =  [];
        this.terrains_4 =  [];
        this.terrains_5 =  [];
        this.chosenTerrains = [];
        const dwarfTerrainTable: HTMLElement = document.getElementById('dwarfTerrains');
        const humanTerrainTable: HTMLElement = document.getElementById('humanTerrains');
        const elfTerrainTable: HTMLElement = document.getElementById('elfTerrains');
        const orcTerrainTable: HTMLElement = document.getElementById('orcTerrains');
        const goblinTerrainTable: HTMLElement = document.getElementById('goblinTerrains');
        const undeadTerrainTable: HTMLElement = document.getElementById('undeadTerrains');
        const unalignedTerrainTable: HTMLElement = document.getElementById('unalignedTerrains');
        dwarfTerrainTable.innerHTML = '';
        humanTerrainTable.innerHTML = '';
        elfTerrainTable.innerHTML = '';
        orcTerrainTable.innerHTML = '';
        goblinTerrainTable.innerHTML = '';
        undeadTerrainTable.innerHTML = '';
        unalignedTerrainTable.innerHTML = '';
        for(let i: number = 2; i<=5; i++ ){
            for (let j: number = 1; j<=Math.min(i,4); j++) {
                const regionButton: HTMLElement = document.getElementById(`region_${i}_${j}`);
                const regionField: HTMLElement = document.getElementById(`region_${i}_${j}_field`);
                regionButton.style.fill = "url(#grad1)";
                regionField.style.fill = "wheat";
                regionField.innerHTML = "Choose Terrain";
            }
        }
        const regionArray: HTMLCollection = document.getElementsByClassName('outerRing');
        Array.from(regionArray).forEach((region: HTMLElement)  => {
            region.style.display = "none";
            region.style.cursor ="pointer";
        });
        const capitalButton: HTMLElement = document.getElementById('capitalButton');
        capitalButton.style.fill = "url(#grad1)";
        capitalButton.style.cursor = "pointer";
        const capitalField: HTMLElement = document.getElementById('capitalButtonField');
        capitalField.style.fill = "wheat";
        capitalField.style.cursor = "pointer";
        capitalField.innerHTML = "Choose Capital";
        this.init();
        this.troopSelection.createTable();
        this.troopSelection.armySelection.clearArmy();
    }

    public fillTerrains(terrains: Array<SelectedTerrain>): void {
        this.chosenTerrains = terrains;
        terrains.forEach((terrain: SelectedTerrain) => {
            if(terrain.region === '1') {
                const button: HTMLElement = document.getElementById('capitalButton');
                button.style.fill = "white";
                button.style.cursor = "default";
                const field: HTMLElement = document.getElementById('capitalButtonField');
                field.style.fill = "black";
                field.style.cursor = "default";
                field.innerHTML = terrain.terrain.name;
                this.capital = terrain.terrain;
            } else {
                const button: HTMLElement = document.getElementById(`region_${terrain.region}`);
                button.style.fill = "white";
                button.style.cursor = "default";
                const field: HTMLElement = document.getElementById(`region_${terrain.region}_field`);
                field.style.fill = "black";
                field.style.cursor = "default";
                field.innerHTML = terrain.terrain.name;
            }
        });

        this.fillRegions();
        Array.from(document.getElementsByClassName('outerRing')).forEach((div: HTMLElement) => {
            div.style.display = "block";
        });
        this.troopSelection.createTable();
    }
}
export default RegionSelection;