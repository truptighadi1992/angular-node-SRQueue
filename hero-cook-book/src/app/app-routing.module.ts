import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSuperHeroComponent } from './create-super-hero/create-super-hero.component';
import { MySuperHeroesComponent } from './hero/my-super-heroes/my-super-heroes.component'
import { LevelListComponent } from './level/level-list/level-list.component';
import { LevelComponent } from './level/level/level.component';
import { VillainComponent } from './villain/villain/villain.component';

const routes: Routes = [
  { path : 'cook', component : CreateSuperHeroComponent},
  { path : 'cook/:heroId', component : CreateSuperHeroComponent},
  { path : 'level/:levelId', component : LevelComponent},
  { path : 'levels', component : LevelListComponent},
  { path : '', redirectTo: 'levels', pathMatch :'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
